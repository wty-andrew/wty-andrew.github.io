import { type HighlightedCode, Pre } from 'codehike/code'

import mark from './annotations/mark'

const Code = ({ codeblock }: { codeblock: HighlightedCode }) => (
  <div className="bg-[#303446]">
    {codeblock.meta && (
      <div className="text-[#a5adce] text-sm px-3 py-2 font-mono border-b">
        {codeblock.meta}
      </div>
    )}
    <Pre code={codeblock} handlers={[mark]} className="bg-[#303446]" />
  </div>
)

export default Code
