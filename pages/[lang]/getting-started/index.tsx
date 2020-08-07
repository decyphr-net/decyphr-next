import { useState } from "react";
import useSWR from "swr";
import withLocale from "../../../i18n/hoc/withLocale";
import useTranslation from "../../../i18n/hooks/useTranslation";
import { Button } from "../../../components/elements/Button";
import { TextInput, SelectInput } from "../../../components/elements/Input";

const GettingStarted = () => {
  const { locale, t } = useTranslation();
  const [nativeLanguage, setNativeLanguage] = useState<string>("");
  const [newLanguage, setNewLanguage] = useState<string>("");
  const [languagePreference, setLanguagePreference] = useState<string>("");
  const [languages, setLanguages] = useState<Array<any>>([]);

  const fetcher = (url) =>
    fetch(url)
      .then((r) => r.json())
      .then((data) => setLanguages(data));

  const { data } = useSWR(process.env.API + "languages/", fetcher);
  return (
    <>
      <h1>
        Welcome
        <small> to Readr by Decyphr.</small>
      </h1>

      <p>
        We noticed that you just signed up so we just need to ask you a couple
        of quick questions before we get started.
      </p>

      <form>
        <SelectInput
          placeholder={t("Accounts.register.leftpanel.nativelanguage")}
          label={t("Accounts.register.leftpanel.nativelanguage")}
          name="nativelanguage"
          dataset={languages}
          onChangeHandler={setNativeLanguage}
        />
        <SelectInput
          placeholder={t("Accounts.register.leftpanel.newlanuagagefield")}
          label={t("Accounts.register.leftpanel.newlanuagagefield")}
          name="newlanguage"
          dataset={languages}
          onChangeHandler={setNewLanguage}
        />
      </form>
    </>
  );
};

export default withLocale(GettingStarted);
