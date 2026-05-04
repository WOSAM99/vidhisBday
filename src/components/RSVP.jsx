import { useState } from "react";
import { motion } from "motion/react";

const initialState = {
  name: "",
  phone: "",
  diet: "",
  secret: "Yes",
};

export default function RSVP() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submitter = event.nativeEvent.submitter;

    if (submitter?.name && submitter?.value) {
      formData.set(submitter.name, submitter.value);
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch(() => {
        setSubmitted(true);
      });
  };

  return (
    <section id="rsvp" className="relative pb-24">
      <div className="section-frame">
        <motion.div
          className="panel mx-auto max-w-4xl overflow-hidden border-gold/18"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85 }}
        >
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-gold/10 bg-[linear-gradient(180deg,rgba(198,168,91,0.10),rgba(11,11,15,0.08))] p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="gold-label">RSVP</p>
              <h2 className="mt-5 font-heading text-4xl uppercase tracking-[0.14em] md:text-5xl">
                Answer The Summons
              </h2>
              <p className="mt-8 text-2xl leading-relaxed text-bone/78">
                Declare your loyalty, leave your details, and await the final
                revelation.
              </p>
            </div>

            <div className="p-8 md:p-10">
              {submitted ? (
                <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                  <p className="gold-label">Confirmed</p>
                  <h3 className="mt-5 font-heading text-3xl uppercase tracking-[0.14em] text-gold md:text-4xl">
                    Your fate is sealed.
                  </h3>
                  <p className="mt-4 text-2xl italic text-bone/78">
                    Location will be revealed.
                  </p>
                </div>
              ) : (
                <form
                  name="rsvp"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="rsvp" />
                  <input type="hidden" name="bot-field" />

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      label="Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                    <Field
                      label="Phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Your number"
                      type="tel"
                      required
                    />
                  </div>

                  <Field
                    label="Dietary Restrictions"
                    name="diet"
                    value={form.diet}
                    onChange={handleChange}
                    placeholder="Tell us what to prepare"
                    textarea
                  />

                  <label className="block">
                    <span className="mb-2 block font-heading text-sm uppercase tracking-[0.28em] text-gold/72">
                      Can You Keep A Secret?
                    </span>
                    <select
                      name="secret"
                      value={form.secret}
                      onChange={handleChange}
                      className="w-full rounded-[1.25rem] border border-gold/18 bg-black/25 px-5 py-4 text-xl text-bone outline-none transition focus:border-gold/60 focus:shadow-glow"
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </label>

                  <div className="grid gap-4 pt-4 md:grid-cols-2">
                    <button
                      type="submit"
                      name="attendance"
                      value="I Dare"
                      className="rounded-full border border-gold/45 bg-gold px-6 py-4 font-heading text-sm uppercase tracking-[0.32em] text-obsidian transition hover:shadow-glow"
                    >
                      RSVP - I Dare
                    </button>
                    <button
                      type="submit"
                      name="attendance"
                      value="I Refuse"
                      className="rounded-full border border-gold/30 bg-transparent px-6 py-4 font-heading text-sm uppercase tracking-[0.32em] text-gold transition hover:border-gold/60 hover:bg-gold/8"
                    >
                      Decline - I Refuse
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  textarea = false,
  type = "text",
  required = false,
}) {
  const className =
    "w-full rounded-[1.25rem] border border-gold/18 bg-black/25 px-5 py-4 text-xl text-bone placeholder:text-bone/35 outline-none transition focus:border-gold/60 focus:shadow-glow";

  return (
    <label className="block">
      <span className="mb-2 block font-heading text-sm uppercase tracking-[0.28em] text-gold/72">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${className} min-h-28 resize-y`}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          required={required}
        />
      )}
    </label>
  );
}
