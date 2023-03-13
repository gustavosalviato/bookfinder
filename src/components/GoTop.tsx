import { FiChevronUp } from 'react-icons/fi'

export function GoTop() {
  function handleScrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <button
      className="max-md:hidden absolute w-12 h-12 bottom-10 right-10 bg-shape flex justify-center items-center rounded-md hover:brightness-90"
      aria-label="Go to top of page"
      onClick={handleScrollTop}
    >
      <FiChevronUp />
    </button>
  )
}
