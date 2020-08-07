import React from "react";
import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";
import withLocale from "../../i18n/hoc/withLocale";
import useTranslation from "../../i18n/hooks/useTranslation";
import styles from "./navigation.module.scss";

const DrawerToggleButton = (props) => (
  <button className={styles.toggleButton} onClick={props.click}>
    <div className={styles.toggleButtonLine}></div>
    <div className={styles.toggleButtonLine}></div>
    <div className={styles.toggleButtonLine}></div>
  </button>
);

export const Backdrop = (props) => (
  <div className={styles.backdrop} onClick={props.click}></div>
);

export const SideDrawer = (props) => {
  const { locale, t } = useTranslation();
  return (
    <nav className={styles.sideDrawer}>
      <div className={styles.close} onClick={props.drawerClickHandler}>
        X
      </div>
      <div>
        <a href="/">
          <img src="/logo.png"></img>
        </a>
      </div>
      <ul>
        <li>
          <Link href="/[lang]/library" as={`/${locale}/library`}>
            <a>Library</a>
          </Link>
        </li>
        <li>
          <Link href="/[lang]/practice" as={`/${locale}/practice`}>
            <a href="/">Practice</a>
          </Link>
        </li>
        <li>
          <Link href="/api/logout">
            <a>Logout</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export const Toolbar = (props) => {
  const { locale, t } = useTranslation();
  return (
    <header className={styles.toolbar}>
      <nav className={styles.toolbarNavigation}>
        <div>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className={styles.toolbarLogo}>
          <a href="/">
            <img src="/nav-logo.png"></img>
          </a>
        </div>

        <div className={styles.navigationItems}>
          <div className={styles.spacer}></div>
          <ul>
            <li>
              <Link href="/[lang]/library" as={`/${locale}/library`}>
                <a>Library</a>
              </Link>
            </li>
            <li>
              <Link href="/[lang]/practice" as={`/${locale}/practice`}>
                <a>Practice</a>
              </Link>
            </li>
            <li>
              <Link href="/api/logout">
                <a>Logout</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
