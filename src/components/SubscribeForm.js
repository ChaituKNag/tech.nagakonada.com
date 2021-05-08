import React, { useState } from "react";
import clsx from "clsx";
import styles from "../css/styles.module.css";
import fetch from "unfetch";

const SubscribeForm = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({
        firstName: form.firstName.value,
        email: form.email.value
      })
    })
      .then((res) => res.json())
      .then(() => {
        setSubscribed(true);
      })
      .catch(() => setSubscribed(true));
  };
  return (
    <div className="margin--lg">
      <form onSubmit={handleSubmit}>
        <h2>Subscribe to my news-letter</h2>
        {subscribed && (
          <p>
            Thanks for subscribing 🙌. If this email is not already subscribed,
            you would receive a confirmation email, please confirm it there to
            get going. See you on the other side.
          </p>
        )}
        {!subscribed && (
          <div className={clsx("padding--md", styles.subscribeForm)}>
            <input
              required
              type="text"
              name="firstName"
              className={clsx(
                styles.subscribeFormField,
                "input-field button text--left margin--sm"
              )}
              placeholder="First Name"
            />
            <input
              required
              type="email"
              name="email"
              className={clsx(
                styles.subscribeFormField,
                "input-field button text--left margin--sm"
              )}
              placeholder="Email"
            />
            <button className="button button--success">Subscribe</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SubscribeForm;
