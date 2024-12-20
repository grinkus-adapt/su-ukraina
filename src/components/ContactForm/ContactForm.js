import * as React from "react";
import PropTypes from "prop-types";

import { getTranslatedText } from "../../utils/getTranslatedText";
import { getLocaleFromPath } from "../../helpers/handlers";

import Button from "../Button";
import FormField from "../FormField";
import { TextInput, PhoneInput, EmailInput } from "../Input";
import TextArea from "../TextArea";

import "./ContactForm.css";

const handleSubmit = (setFormState) => {
  return (event) => {
    const formData = new FormData(event.target);

    setFormState({ error: false, loading: true, success: false });

    const body = {
      name: formData.get(`name`) || ``,
      phone: formData.get(`phone`) || ``,
      email: formData.get(`email`) || ``,
      category: formData.get(`category`) || ``,
      description: formData.get(`description`) || ``,
      "privacy-policy-accepted": formData.get(`privacy-policy-accepted`) || ``,
    };

    fetch(event.target.action, {
      method: event.target.method,
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not OK`);
        }
        return response;
      })
      .then(() => {
        setFormState({ error: false, loading: false, success: true });
      })
      .catch((error) => {
        setFormState({ error: true, loading: false, success: false });
        console.error(error);
      });

    event.preventDefault();
  };
};

const ContactForm = ({ returnDestination = `/` }) => {
  const [formState, setFormState] = React.useState({
    error: false,
    loading: false,
    success: false,
  });

  const locale = getLocaleFromPath();

  const curriedHandleSubmit = React.useCallback(handleSubmit(setFormState), []);

  return (
    <div className="ContactForm">
      <div className="ContactForm__text">
        <div className="ContactForm__text-title">
          {getTranslatedText(`contactForm.title`)}
        </div>
        <p>{getTranslatedText(`contactForm.text`)}</p>
        <p>{getTranslatedText(`contactForm.subtext`)}</p>
      </div>
      <div className="ContactForm__form">
        {formState.success ? (
          <div className="ContactForm__success">
            <p>{getTranslatedText(`contactForm.success`)}</p>
          </div>
        ) : (
          <form
            method="POST"
            action={`https://api.suukraina.lt/v1/submit?destination=${encodeURIComponent(
              returnDestination
            )}`}
            onSubmit={curriedHandleSubmit}
          >
            <FormField
              labelFor="name"
              label={getTranslatedText(`labels.name`)}
              type="text"
            >
              <TextInput
                id="name"
                placeholder={getTranslatedText(`placeholders.name`)}
                name="name"
                required
              />
            </FormField>

            <FormField
              labelFor="email"
              label={getTranslatedText(`labels.email`)}
              type="email"
            >
              <EmailInput
                id="email"
                placeholder={getTranslatedText(`placeholders.email`)}
                name="email"
                required
              />
            </FormField>

            <FormField
              labelFor="phone"
              label={getTranslatedText(`labels.phone`)}
              type="text"
            >
              <PhoneInput
                id="phone"
                name="phone"
                pattern="\+\d{6,14}$"
                placeholder={getTranslatedText(`placeholders.phone`)}
              />
            </FormField>

            <FormField
              labelFor="description"
              label={getTranslatedText(`labels.message`)}
              type="textarea"
            >
              <TextArea
                id="description"
                placeholder={getTranslatedText(`placeholders.message`)}
                name="description"
                required
              />
            </FormField>

            <input type="hidden" id="category" name="category" value={locale} />

            <div className="form-field form-field--type-checkbox">
              <label htmlFor="privacy-policy-accepted" tabIndex="0">
                <input
                  type="checkbox"
                  id="privacy-policy-accepted"
                  name="privacy-policy-accepted"
                  required
                />
                <span className="ContactForm__privacy-policy-text">
                  {getTranslatedText(`contactForm.tacAgree`)}
                  {` `}
                </span>
                <a
                  href={getTranslatedText(`pagePath.privacyPolicy`)}
                  target="_blank"
                  className="ContactForm__privacy-policy-text-link"
                  title={getTranslatedText(`generic.privacyPolicy`)}
                  rel="noopener"
                >
                  {getTranslatedText(`generic.privacyPolicy`)}
                </a>
              </label>
            </div>

            {!!formState.error && (
              <p className="ContactForm__error">
                {getTranslatedText(`contactForm.error`)}.
              </p>
            )}

            <div className="ContactForm__actions">
              <Button
                color="primary-outline"
                disabled={formState.loading}
                type="submit"
                endIcon={`arrow-blue`}
              >
                {getTranslatedText(`actions.send`)}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

ContactForm.propTypes = {
  returnDestination: PropTypes.string,
};

export default ContactForm;
