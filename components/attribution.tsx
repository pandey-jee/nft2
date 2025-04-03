import { ExternalLink } from "lucide-react"

interface AttributionProps {
    author: string
    source: string
}

export function Attribution({ author, source }: AttributionProps) {
    return (
        <div className="text-xs text-gray-500 mt-2">
            <span>Image by </span>
            <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
            >
                {author}
                <ExternalLink className="h-3 w-3" />
            </a>
            <span> on Freepik</span>
        </div>
    )
} 