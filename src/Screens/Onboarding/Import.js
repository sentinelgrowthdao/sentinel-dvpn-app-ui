import React from "react";
import styles from "./import.module.scss";
import Button, { variants } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withSingleDispatcherLoader } from "../../actions/loader.action";
import { createWalletWithMnemonic } from "../../actions/onboarding.action";

const Import = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [noOfWords, setNoOfWords] = React.useState(24);
  const [inputValues, setInputValues] = React.useState(
    Array(noOfWords).fill("")
  );

  const isValidMnemonic =
    inputValues.length === noOfWords &&
    !inputValues.some(
      (item) => item === "" || item === null || item === undefined
    );

  const NoOfWords = React.useMemo(
    () => (
      <div className={styles["no-of-words-selector"]}>
        <button
          className={`${styles.btn} ${
            noOfWords === 24 ? styles.active : styles.inactive
          }`}
          onClick={() => {
            setNoOfWords(24);
            setInputValues(Array(24).fill(""));
          }}
        >
          24 Words
        </button>
        <button
          className={`${styles.btn} ${
            noOfWords === 12 ? styles.active : styles.inactive
          }`}
          onClick={() => {
            setNoOfWords(12);
            setInputValues(Array(12).fill(""));
          }}
        >
          12 Words
        </button>
      </div>
    ),
    [noOfWords]
  );

  React.useEffect(() => {
    const inputBoxes = document.querySelectorAll(`.${styles["input-box"]}`);
    inputBoxes.forEach((input, index) => {
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          if (index < inputBoxes.length - 1) {
            inputBoxes[index + 1].focus();
          }
        }
      });
    });
  }, []);

  const handleChange = (event, index) => {
    const { value } = event.target;
    if (event.nativeEvent.data === " ") {
      const ib = document.getElementById(`mnemonic-input-box-${index + 1}`);
      if (ib) {
        ib.focus();
      }
      return;
    }
    const values = String(value).split(" ");

    if (values && values.length > 1) {
      let inputs = Array(noOfWords).fill("");
      for (let i = 0; i < values.length; i++) {
        if (i < noOfWords) {
          inputs[i] = values[i];
        } else {
          break;
        }
      }
      setInputValues(inputs);
      return;
    }

    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  return (
    <div className={styles.root}>
      <section className={styles.top}>
        <span className={styles.title}>Log in with your key</span>
        <span className={styles.description}>
          Provide your unique {noOfWords} word key
        </span>
      </section>
      <section className={styles.middle}>
        <fieldset className={styles["mnemonic-inputs"]}>
          <legend align={"center"}>{NoOfWords}</legend>
          <section className={styles["input-values"]}>
            {inputValues.map((value, index) => (
              <section className={styles.input} key={index}>
                <input
                  className={`${styles["input-box"]}`}
                  id={`mnemonic-input-box-${index}`}
                  type="text"
                  value={value}
                  onChange={(event) => {
                    event.preventDefault();
                    handleChange(event, index);
                  }}
                  placeholder={`${index + 1}`}
                  // onPaste={handlePaste}
                />
              </section>
            ))}
          </section>
        </fieldset>
      </section>

      <section className={styles.bottom}>
        {/* <Button
          variant={variants.TRANSPARENT}
          title={"Paste from Clipboard"}
          className={styles["primary-btn"]}
          onClick={handlePasteFromClipboard}
        /> */}
        <Button
          variant={variants.PRIMARY}
          title={"Import Account"}
          disabled={!isValidMnemonic}
          className={styles["primary-btn"]}
          onClick={async (event) => {
            event.preventDefault();
            const { payload } = await dispatch(
              withSingleDispatcherLoader(
                createWalletWithMnemonic(inputValues.join(" "))
              )
            );
            if (
              payload &&
              payload.error &&
              payload.error.message &&
              payload.error.message === "Rejected"
            ) {
              return;
            }
            navigate("/", { replace: true });
          }}
        />
        <Button
          variant={variants.SECONDARY}
          title={"Create New Account"}
          className={styles["primary-btn"]}
          onClick={async (event) => {
            event.preventDefault();
            navigate("/create", { replace: true });
          }}
        />
      </section>
    </div>
  );
};

export default Import;
