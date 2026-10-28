const Sidebar = () => {
  return (
    <aside className="flex h-screen flex-col px-10 fixed left-0 top-16 bottom-0">
      <div className="pt-6">
        <h1 className="text-xl font-bold">Logo</h1>
      </div>

      <ul className="flex flex-1 flex-col justify-center gap-9">
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