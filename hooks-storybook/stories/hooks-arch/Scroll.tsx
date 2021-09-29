import { UIEventHandler, useEffect, useRef } from "react"

class ScrollDescriptor {
  private left: number = 0
  private top: number = 0
  private scrollHeight: number = 0
  private offsetHeight: number = 0

  public update(
    left: number,
    top : number,
    offsetHeight : number,
    scrollHeight : number
  ) {
    this.left = left
    this.top = top
    this.scrollHeight = scrollHeight
    this.offsetHeight = offsetHeight
  }

  public bottomReached() {
    return this.top + this.offsetHeight >= this.scrollHeight
  }
}

const useScroll = () => {

  const scrollInfo = useRef(new ScrollDescriptor())

  const scrollHandler : UIEventHandler<HTMLDivElement> = (e) => {
    const scroller = e.currentTarget
    const left = e.currentTarget.scrollLeft
    const top = e.currentTarget.scrollTop
    scrollInfo.current.update(left, top, scroller.offsetHeight, scroller.scrollHeight)
  }

  return {
    onScroll : scrollHandler,
    info : scrollInfo.current
  }
}

export const ScrollerExample = () => {
  const {onScroll, info} = useScroll()

  useEffect(() => {
    function raf() {
      console.log(info.bottomReached())
      requestAnimationFrame(raf)
    }
    raf()
  }, [])
  return (
    <div
      onScroll={onScroll}
      style={{
        height: 600,
        width: 400,
        overflow: "scroll",
      }}
    >
      <div
        style={{
          height: 800,
          width: "100%",
          background: "red",
        }}
      ></div>
      <div
        style={{
          height: 800,
          width: "100%",
          background: "blue",
        }}
      ></div>
      <div
        style={{
          height: 800,
          width: "100%",
          background: "yellow",
        }}
      ></div>
    </div>
  )
}