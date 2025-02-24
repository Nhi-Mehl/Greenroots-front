import Button from '../../Form/Button/Button';
import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import TextArea from '../../Form/TextArea/TextArea';

function ContactPage() {
  return (
    <main className="px-4 py-10 sm:px-8 md:px-12 sm:py-12 md:py-28">
      <section className="p-8 mb-10 border-2 border-solid border-greenRegular rounded-lg bg-white shadow-md lg:max-w-[900px] lg:mx-auto">
        <h1 className="h2-title text-3xl text-greenRegular text-center mb-6 lg:text-5xl">
          Contact
        </h1>
        <p className="text-sm text-justify sm:text-base md:text-lg lg:text-xl">
          Vous avez un projet environnemental que vous souhaitez développer ?
          Nous serions ravis de collaborer avec vous ! Veuillez remplir le
          formulaire ci-dessous et nous fournir des informations sur votre
          projet. Notre équipe examinera attentivement votre proposition et vous
          contactera pour discuter des possibilités de partenariat. Merci de
          votre engagement en faveur d&apos;un avenir durable !
        </p>
      </section>
      <section className="p-6 bg-white shadow-md border-2 border-greenRegular rounded-lg lg:max-w-[600px] lg:mx-auto">
        <Form action="/contact" onSubmit={(e) => e.preventDefault()}>
          <Input
            htmlFor="nom"
            label="Votre nom"
            type="text"
            id="nom"
            name="nom"
            placeholder="Votre nom"
          />
          <Input
            htmlFor="prenom"
            label="Votre prénom"
            type="text"
            id="prenom"
            name="prenom"
            placeholder="Votre prénom"
          />

          <Input
            htmlFor="email"
            label="Votre email"
            type="email"
            id="email"
            name="email"
            placeholder="Votre email"
          />

          <TextArea
            htmlFor="message"
            label="Votre message"
            rows={4}
            cols={50}
            id="message"
            name="message"
            placeholder="Votre message"
          />

          <Button variant="form" className="btn-form mt-4" type="submit">
            Envoyer
          </Button>
        </Form>
      </section>
    </main>
  );
}

export default ContactPage;
