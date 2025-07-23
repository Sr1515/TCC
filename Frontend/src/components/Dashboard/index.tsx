import { ContentWrapper, Header, LayoutContainer, MainContent, Sidebar } from "./style";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <LayoutContainer>
      <Sidebar>
        <h2>Dashboard</h2>
        <nav>
          <div>Home</div>
          <div>Minhas Sessões</div>
        </nav>
      </Sidebar>

      <ContentWrapper>
        <Header>Painel de Sessão</Header>
        <MainContent>{children}</MainContent>
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default DashboardLayout;