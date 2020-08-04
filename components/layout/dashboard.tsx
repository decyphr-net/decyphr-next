import { useState } from "react";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import {
  Toolbar,
  SideDrawer,
  Backdrop,
} from "../../components/layout/Navigation";
import styles from "./dashboard.module.scss";

export default function DashboardLayout({
  children,
  title,
  pageTitle,
  pageSubtitle,
}) {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggle = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container fluid>
        <main className={styles.layout}>
          <Toolbar drawerClickHandler={drawerToggle} />
          {sideDrawerOpen && (
            <>
              <SideDrawer drawerClickHandler={drawerToggle} />
              <Backdrop click={backdropClickHandler} />
            </>
          )}
          <section>
            <Row noGutters={true}>
              <Col xs={{ span: 11, offset: 1 }}>
                <h1 className={styles.pageTitle}>{pageTitle}</h1>
              </Col>

              <Col xs={{ span: 11, offset: 1 }}>
                <p className={styles.pageSubtitle}>{pageSubtitle}</p>
              </Col>
            </Row>
          </section>

          <section>{children}</section>
        </main>
      </Container>
    </>
  );
}
