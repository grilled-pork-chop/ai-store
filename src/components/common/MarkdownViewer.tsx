import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight"


export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className="min-h-0 w-full h-full border rounded-lg p-3 text-sm">
      <article
        className="markdown-body min-h-[300px] bg-transparent text-[13px] leading-relaxed dark:bg-transparent!"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>
          {content || "*Nothing to preview*"}
        </ReactMarkdown>
      </article>
    </div>
  )
}
