export const addHeaderShadowWhileScroll = (
  headerId: string,
  scrollingElChildrenId: string,
) => {
  const header = document.getElementById(headerId)
  const block = document.getElementById(scrollingElChildrenId)

  if (!block || !header) {
    return
  }
  const defaultOffset = block?.offsetTop
  const scrollOffset = block?.getBoundingClientRect().top

  if (defaultOffset > scrollOffset) {
    header.style.borderBottom = '1px solid black'
    header.style.boxShadow = '0 7px 10px rgba(0, 0, 0, 0.25)'
  } else {
    header.style.borderBottom = 'unset'
    header.style.boxShadow = 'unset'
  }
}
