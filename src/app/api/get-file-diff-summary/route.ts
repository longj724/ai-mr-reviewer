// External Dependencies
import Replicate from "replicate";

// Relative Dependencies
import { ParsedDiff } from "~/lib/types";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function POST(req: Request) {
  const { diffs }: { diffs: ParsedDiff[] } = await req.json();

  const returnedDiffs = await Promise.all(
    diffs.map(async (diff) => {
      const { oldCode, newCode } = diff;
      const prompt = `You are a code reviewer. You are given a code diff and you need to summarize the change in a few sentences.
                      You will be given code labeled "old code:" and "new code:". Try to be concise but if the code change is
                      large you can provide a more detailed explanation. Avoid starting the response with statements like:
                      "The code change is..." or "The diff is...".
                      Old code: ${oldCode}
                      New code: ${newCode}
                    `;

      const output = await replicate.run(
        "mistralai/mixtral-8x7b-instruct-v0.1",
        {
          input: {
            top_k: 50,
            top_p: 0.95,
            prompt: prompt,
            temperature: 0.7,
            max_new_tokens: 512,
            min_new_tokens: -1,
            repetition_penalty: 1,
          },
        },
      );
      // @ts-ignore
      const text = output.join("");

      return {
        ...diff,
        summary: text,
      };
    }),
  );

  return new Response(JSON.stringify({ data: returnedDiffs }));
}
