// External Dependencies
import OpenAI from "openai";

// Relative Dependencies
import { ParsedDiff } from "~/lib/types";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { diffs }: { diffs: ParsedDiff[] } = await req.json();

  const returnedDiffs = await Promise.all(
    diffs.map(async (diff) => {
      const { oldCode, newCode } = diff;
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a code reviewer. You are given a code diff and you need to summarize the change in a few sentences.
                      You will be given code labeled "old code:" and "new code:". Try to be concise but if the code change is
                      large you can provide a more detailed explanation. Avoid starting the response with statements like:
                      "The code change is..." or "The diff is...".
                  
                      Here is the old code: ${oldCode}
                      Here is the new code: ${newCode}
                    `,
          },
        ],
      });
      console.log("response is", response.choices[0]);

      const summary = response.choices[0]
        ? response.choices[0].message.content
        : "Unable to generate summary";
      return {
        ...diff,
        summary,
      };
    }),
  );
  return new Response(JSON.stringify({ data: returnedDiffs }));
}
