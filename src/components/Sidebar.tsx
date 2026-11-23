const Sidebar = () => {
  return (
    <aside className="app-sidebar flex h-screen flex-col px-10 fixed left-0 bottom-0 bg-black top-12 border-r">
      <ul className="flex flex-1 flex-col justify-center gap-9 [&>li]:hover:cursor-pointer">
        <li>Dashboard</li>
        <li>Portfolio</li>
        <li>Transactions</li>
        <li>Analysis</li>
        <li>News</li>
      </ul>
    </aside>
  )
}

export default Sidebar