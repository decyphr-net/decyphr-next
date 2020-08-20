import { useState } from "react";
import useSWR from "swr";
import { Button } from "../../components/elements/Button";
import { TextInput, SelectInput } from "../../components/elements/Input";

const GettingStarted = () => {
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
          placeholder="Native Language"
          label="Native Language"
          name="nativelanguage"
          dataset={languages}
          onChangeHandler={setNativeLanguage}
        />
        <SelectInput
          placeholder="New Language"
          label="New Language"
          name="newlanguage"
          dataset={languages}
          onChangeHandler={setNewLanguage}
        />
      </form>
    </>
  );
};

export default GettingStarted;
