/**
 * A layout component for displaying content with a sidebar.
 *
 * This component provides a flexible layout structure that is particularly
 * suitable for detail views or pages where you want to showcase the main
 * content alongside related information in a sidebar.  The sidebar is sticky,
 * meaning it will remain visible as the user scrolls through the main content.
 */
export default function DetailLayout({
  MainContent,
  SideBar,
  Actions,
}: {
  /** The main content to be displayed. */
  MainContent: JSX.Element;
  /** The content to be displayed in the sidebar. */
  SideBar: JSX.Element;
  Actions?: JSX.Element;
}) {
  return (
    // RIMBA: a grid so wide main content never pushes the sidebar off screen.
    <div className="grid grid-cols-1 gap-6 w-full lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="min-w-0">{MainContent}</div>
      <div className="flex flex-col gap-4 min-w-0">
        {Actions}
        <div className="sticky top-8 w-full">{SideBar}</div>
      </div>
    </div>
  );
}
