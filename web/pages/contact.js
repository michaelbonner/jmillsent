/* eslint-disable @next/next/no-img-element */
import groq from "groq";
import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import { toast } from "react-toastify";
import urlForSanitySource from "../lib/urlForSanitySource";
import { H1 } from "../components/headings";
import * as Yup from "yup";
import "yup-phone";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import Map from "../components/map";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short")
    .max(120, "Too long")
    .required("Full name is required"),
  emailAddress: Yup.string()
    .email("Invalid email")
    .required("Email address is required"),
  phoneNumber: Yup.string()
    .label("Phone number")
    .phone("Invalid phone")
    .required("Valid Phone number is Required"),
  message: Yup.string().min(2, "Too short").required("Message is Required"),
});

function Contact({ contact }) {
  const [state, setState] = useState("initial");
  const contactForm = {
    name: "",
    emailAddress: "",
    phoneNumber: "",
    message: "",
  };

  const backgroundImageUrl = urlForSanitySource(contact.backgroundImage)
    .width(1400)
    .url();
  return (
    <Layout title={contact.seoTitle} description={contact.seoDescription}>
      <div
        style={{
          backgroundColor: "#ccc",
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 lg:px-0 py-24 text-center">
          <H1>{contact.title}</H1>
        </div>
        <div className="max-w-7xl w-full mx-auto lg:flex space-x-16 pb-24">
          <div className="max-w-lg lg:w-1/2">
            {state === "initial" && (
              <Formik
                initialValues={contactForm}
                validationSchema={contactSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const response = await fetch("/api/contact", {
                      method: "post",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(values),
                    });

                    if (response?.status === 201) {
                      setState("submitted");
                      setSubmitting(false);
                    } else {
                      setSubmitting(false);
                      toast("Save failed", {
                        type: toast.TYPE.ERROR,
                      });
                    }
                  } catch (error) {
                    setSubmitting(false);
                    toast("Save failed", {
                      type: toast.TYPE.ERROR,
                    });
                  }
                }}
              >
                {({ isSubmitting, isValid }) => (
                  <Form className="grid grid-cols-1 gap-y-6 max-w-3xl mx-auto">
                    <div className="border-gray-300 rounded-md bg-white bg-opacity-90 relative">
                      <Field
                        as="input"
                        name="name"
                        placeholder="FULL NAME"
                        className="bg-transparent block w-full shadow-sm py-3 px-4 text-gray-500 placeholder-black focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <ErrorMessage
                        name="name"
                        className="absolute right-2 top-0 text-left text-red-700 px-4 py-3"
                        component="div"
                      />
                    </div>

                    <div className="border-gray-300 rounded-md bg-white bg-opacity-90 relative">
                      <Field
                        as="input"
                        name="emailAddress"
                        placeholder="EMAIL ADDRESS"
                        className="bg-transparent block w-full shadow-sm py-3 px-4 text-gray-500 placeholder-black focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <ErrorMessage
                        name="emailAddress"
                        className="absolute right-2 top-0 text-left text-red-700 px-4 py-3"
                        component="div"
                      />
                    </div>

                    <div className="border-gray-300 rounded-md bg-white bg-opacity-90 relative">
                      <Field
                        as="input"
                        name="phoneNumber"
                        placeholder="PHONE NUMBER"
                        className="bg-transparent block w-full shadow-sm py-3 px-4 text-gray-500 placeholder-black focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        className="absolute right-2 top-0 text-left text-red-700 px-4 py-3"
                        component="div"
                      />
                    </div>

                    <div className="border-gray-300 rounded-md bg-white bg-opacity-90 relative">
                      <Field
                        as="textarea"
                        name="message"
                        placeholder="MESSAGE"
                        rows="4"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 text-gray-500 placeholder-black focus:border-indigo-500 border-gray-300 rounded-md bg-transparent"
                      />
                      <ErrorMessage
                        name="message"
                        className="absolute right-2 top-0 text-left text-red-700 px-4 py-3"
                        component="div"
                      />
                    </div>

                    <button
                      type="submit"
                      className={`inline-block rounded-full font-bold uppercase tracking-wider border border-white py-2 px-8 bg-black bg-opacity-50 hover:bg-gold hover:text-black transition-all
                          ${isSubmitting || !isValid ? "opacity-50" : ""}
                        }`}
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            )}

            {state === "submitted" && (
              <div className="relative h-full flex flex-col justify-center items-center text-center bg-white rounded-md shadow-md py-24 px-8 text-gray-900">
                <h2 className="font-medium text-2xl relative z-20">
                  Thank you for contacting us!
                  <br />
                  We will be in touch soon.
                </h2>
              </div>
            )}
          </div>
          <div className="w-full lg:w-1/2">
            <Map
              marker={{
                lat: 40.8664457,
                lng: -111.9247221,
                icon: "https://jmillsent.vercel.app/images/map-pin.png",
              }}
            />
          </div>
        </div>
      </div>
      <div className="bg-black">
        <div className="max-w-5xl mx-auto px-4 lg:px-0 pt-24 flex items-center justify-center space-x-12 prose prose-white text-gray-300 font-light text-lg">
          <div>
            <p>
              JME STUDIO ADDRESS
              <br />
              <a
                className="text-gray-300"
                href="https://g.page/jmillsent?share"
              >
                1589 W 2225 S<br />
                WOODS CROSS, UT 84087
              </a>
            </p>
          </div>
          <div>
            <span className="block h-16 w-px bg-white" />
          </div>
          <div>
            <p>
              STUDIO LINE:{" "}
              <a className="text-gray-300" href="tel:801-797-9023">
                801-797-9023
              </a>
              <br />
              DIRECT LINE:{" "}
              <a className="text-gray-300" href="tel:801-971-4683">
                801-971-4683
              </a>
              <br />
              EMAIL:{" "}
              <a className="text-gray-300" href="mailto:info@jmillsent.com">
                INFO@JMILLSENT.COM
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      contact: await getClient().fetch(groq`
          *[_type == "contactPage"][0]{
            title,
            backgroundImage,
            seoTitle,
            seoDescription
          }
        `),
    },
  };
}

export default Contact;
