import { FiChevronUp } from 'react-icons/fi'
interface GoTopProps {
  onScrollTop?: () => void
}

export function GoTop({ onScrollTop }: GoTopProps) {
  return (
    <button
      className="max-md:hidden absolute w-12 h-12 bottom-10 right-10 bg-shape flex justify-center items-center rounded-md hover:brightness-90"
      aria-label="Go to top of page"
      onClick={onScrollTop}
    >
      <FiChevronUp />
    </button>
  )
}
