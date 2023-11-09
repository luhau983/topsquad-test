interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  console.log(props);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Layout;
