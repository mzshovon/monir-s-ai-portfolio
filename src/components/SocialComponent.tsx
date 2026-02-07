import { Github, Linkedin } from 'lucide-react'
import React from 'react'

function SocialComponent() {
  return (
    <div className="text-sm text-muted-foreground">
        <p className="mb-4 mt-4">
            Connect me with professional network!
        </p>
        <a
            href="https://www.linkedin.com/in/zamanshovon/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077B5] hover:bg-[#006699] text-white rounded-lg transition-colors text-sm font-medium"
        >
            <Linkedin className="w-4 h-4" />
            Connect on LinkedIn
        </a>
        <a
            href="https://github.com/mzshovon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#333] hover:bg-[#525050] text-white rounded-lg transition-colors text-sm font-medium ml-2"
        >
            <Github className="w-4 h-4" />
            Watch on GitHub
        </a>
        <a
            href="https://github.com/mzshovon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#333] hover:bg-[#525050] text-white rounded-lg transition-colors text-sm font-medium ml-2"
        >
            <Github className="w-4 h-4" />
            Watch on GitHub
        </a>
    </div>
  )
}

export default SocialComponent