import React from "react";
import Router from "next/router";
import { Card, Row, Col } from "react-bootstrap";
import Popup from "reactjs-popup";
import withLocale from "../../../i18n/hoc/withLocale";
import useTranslation from "../../../i18n/hooks/useTranslation";
import APIInterface from "../../../utils/api/client";
import api from "../../../utils/api";
import DashboardLayout from "../../../components/layout/dashboard";
import buttonStyle from "../../../components/elements/button.module.scss";
import styles from "./library.module.scss";
import { ListInput } from "../../../components/elements/Input";
import { Button } from "../../../components/elements/Button";

const Library: React.FC = () => {
  const { locale, t } = useTranslation();
  const [libraryItems, setLibraryItems] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [choice, setChoice] = React.useState(0);
  const [choiceText, setChoiceText] = React.useState("");
  const [errors, setErrors] = React.useState([]);

  React.useEffect(() => {
    getLibraryItems();
  }, []);

  React.useEffect(() => {}, [libraryItems]);

  React.useEffect(() => {}, [searchResults]);

  const getLibraryItems = async () => {
    let apiInterface = new APIInterface("getReadingList");
    apiInterface
      .request()
      .then((response) => {
        setLibraryItems(response);
      })
      .catch((errors) => {
        console.error(errors);
        setErrors(errors);
      });
  };

  const truncateString = (text) => {
    if (text.length <= 150) {
      return text;
    }
    return text.slice(0, 150) + "...";
  };

  const proceedToSession = (e) => {
    e.preventDefault();
    Router.push(
      `/[lang]/reading-session?id=${e.target.value}`,
      `/${locale}/reading-session?id=${e.target.value}`,
      { query: { id: e.target.value } }
    );
  };

  const performBookSearch = async (text) => {
    setChoiceText(text);
    await api(
      "GET",
      "bookSearch",
      setSearchResults,
      setErrors,
      true,
      undefined,
      text
    );
  };

  const setChoiceValues = (e) => {
    setChoiceText(e.target.innerHTML);
    setChoice(e.target.id);
    setSearchResults([]);
  };

  const updateLocalState = (data) => {
    setLibraryItems([data, ...libraryItems]);
  };

  const addToReadingList = async (e) => {
    e.preventDefault();

    let data: any = {
      book: choice,
    };
    await api("POST", "readingList", updateLocalState, setErrors, true, data);
  };

  const markAsComplete = async (e) => {
    const id = e.target.id;
    const currentdate = new Date();
    const datetime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate() +
      "T" +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    console.log(datetime);
    const data = {
      finished_on: datetime,
    };

    let apiInterface = new APIInterface(
      "updateLibraryItem",
      data,
      undefined,
      id
    );
    apiInterface
      .request()
      .then((response) => {
        console.log(response);
      })
      .catch((errors) => {
        console.error(errors);
        setErrors(errors);
      });
  };

  return (
    <DashboardLayout
      title={t("Library.page.title")}
      pageTitle={t("Library.page.header")}
      pageSubtitle={t("Library.page.subtitle")}
    >
      <Row noGutters={true} className="justify-content-md-center">
        <Col md={10}>
          <Row noGutters={true}>
            <Col
              className={"text-md-center auto-container"}
              sm={12}
              md={12}
              lg={{ span: 5, offset: 3 }}
            >
              <div className="flex-container flex-column pos-rel">
                <ListInput
                  className={styles.search}
                  placeholder={t("Library.input.placeholder")}
                  name="search"
                  label={t("Library.input.label")}
                  value={choiceText}
                  type="text"
                  onChangeHandler={performBookSearch}
                />

                {searchResults ? (
                  <div className={styles.autoContainer}>
                    {searchResults.map((value, item) => {
                      return (
                        <div className={styles.option} key={item}>
                          <p id={value.id} onClick={(e) => setChoiceValues(e)}>
                            {value.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Col>
            <Col
              className={"text-center text-lg-left"}
              sm={12}
              md={12}
              lg={{ span: 4, offset: 0 }}
            >
              <Button
                text={t("Library.input.button.text")}
                className={styles.inlineButton}
                onClickHandler={addToReadingList}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row noGutters={true} className={styles.library}>
        {libraryItems.map((item, index) => {
          return (
            <Row
              noGutters={true}
              key={index}
              className="justify-content-center"
            >
              <Col className={"text-center"} lg={8}>
                <Card className={`${styles.bookPanel} flex-row flex-wrap`}>
                  <Row noGutters={true}>
                    <Col sm={12} md={3}>
                      <Card.Header>
                        <img src={item.book.small_thumbnail} alt="" />
                      </Card.Header>
                    </Col>
                    <Col sm={12} md={9}>
                      <Card.Body>
                        <Card.Title>{item.book.title}</Card.Title>
                        <Card.Text>
                          {truncateString(item.book.description)}
                        </Card.Text>
                        <Button
                          className={"text-sm-center"}
                          text={t("Library.item.startsession")}
                          value={item.id}
                          onClickHandler={proceedToSession}
                        />

                        <Popup
                          trigger={
                            <button
                              className={`${buttonStyle.formButton} text-sm-center open-menu`}
                            >
                              {" "}
                              Options
                            </button>
                          }
                          position="right center"
                        >
                          <ul className={styles.menu}>
                            <li id={item.id} onClick={(e) => markAsComplete(e)}>
                              Mark as complete
                            </li>
                          </ul>
                        </Popup>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          );
        })}
      </Row>
    </DashboardLayout>
  );
};

export default withLocale(Library);
