/**
 * ページを移るたびに作り直される枠。太陽色の幕が上がり、新しいページがせり上がる。
 * 最初の読み込みではオープニングがあるので出さない（html.first-load、MotionController が外す）。
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="page-curtain" aria-hidden="true">
        <span className="page-curtain__sun" />
      </div>
      <div className="page-enter">{children}</div>
    </>
  );
}
