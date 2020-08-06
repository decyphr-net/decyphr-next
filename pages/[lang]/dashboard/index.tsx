import { useState, useEffect } from "react";
import Router from "next/router";
import { Card, Row, Col } from "react-bootstrap";
import withLocale from "../../../i18n/hoc/withLocale";
import { NextPage } from "next";
import useTranslation from "../../../i18n/hooks/useTranslation";
import APIInterface from "../../../utils/api/client";
import DashboardLayout from "../../../components/layout/dashboard";
import { Button } from "../../../components/elements/Button";
import auth0 from "../../../utils/auth/auth0";

const Dashboard: NextPage = (props) => {
  const { locale, t } = useTranslation();

  const [translationCount, setTranslationCount] = useState(0);
  const [libraryItemCount, setlibraryItemCount] = useState(0);
  const [readingSessionCount, setReadingSessionCount] = useState(0);
  const [practiceSessionCount, setPracticeSessionCount] = useState(0);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    let apiInterface = new APIInterface("dashboard");
    apiInterface
      .request()
      .then((response) => {
        setTranslationCount(response.translations_count);
        setlibraryItemCount(response.library_item_count);
        setPracticeSessionCount(response.practice_sessions_count);
        setReadingSessionCount(response.reading_sessions_count);

        // We need to set the translation count to determine whether or not a
        // user can access the practice sessions.
        localStorage.setItem("translationCount", response.translations_count);
      })
      .catch((errors) => setErrors(errors));
  };

  const redirectToPage = (e) => {
    let pageName = e.target.value;
    Router.push(`/[lang]/${pageName}`, `/${locale}/${pageName}`);
  };

  return (
    <DashboardLayout
      title={t("Dashboard.page.title")}
      pageTitle={t("Dashboard.page.header")}
      pageSubtitle={t("Dashboard.page.subtitle")}
    >
      <Row noGutters={true} className="justify-content-md-center">
        <Col className="text-center" sm={12} md={3}>
          <Card>
            <Card.Body>
              <Card.Title>{t("Dashboard.cards.translation.header")}</Card.Title>
              <Card.Text>{t("Dashboard.cards.translation.bodyone")}</Card.Text>
              <Card.Text>{translationCount}</Card.Text>
              <Card.Text>{t("Dashboard.cards.translation.bodytwo")}</Card.Text>
              <Button
                className={"text-sm-center text-md-right"}
                text={t("Dashboard.cards.translation.button.text")}
                value={"library"}
                onClickHandler={redirectToPage}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-center" sm={12} md={3}>
          <Card>
            <Card.Body>
              <Card.Title>{t("Dashboard.cards.practice.header")}</Card.Title>
              <Card.Text>{t("Dashboard.cards.practice.bodyone")}</Card.Text>
              <Card.Text>{practiceSessionCount}</Card.Text>
              <Card.Text>{t("Dashboard.cards.practice.bodytwo")}</Card.Text>
              <Button
                className={"text-sm-center text-md-right"}
                text={t("Dashboard.cards.practice.button.text")}
                value={"practice"}
                onClickHandler={redirectToPage}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

Dashboard.getInitialProps = async ({ req, res }) => {
  if (typeof window === "undefined") {
    const session = await auth0.getSession(req);
    if (!session || !session.user) {
      res.writeHead(302, {
        Location: "/api/login",
      });
      res.end();
      return;
    }
    return { user: session.user };
  }
};

// export default Dashboard;

export default withLocale(Dashboard);
