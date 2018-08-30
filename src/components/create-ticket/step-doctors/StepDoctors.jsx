import React from "react";
import CreateTicketCard from "../../create-ticket-card/CreateTicketCard";
import CustomSelect from "../../select/CustomSelect";

const createTicketCards = [
  {
    title: `General Practitioner `,
    desc: `Another term for a general practitioner is a Family Doctor who treats common health issues.`
  },
  {
    title: `Dermatologist`,
    desc: `A Doctor who treats any skin, hair,nails related issues.`
  },
  {
    title: `Dentist`,
    desc: `A Doctor who treats teeth and gum related issues. For good oral health, we visit a dentist.`
  },
  {
    title: `Cardiologist`,
    desc: `A heart Doctor who treats any cardiovascular diseases.`
  },
  {
    title: `Gynecologist / Obstetrician`,
    desc: `
Gynecologists work with female reproductive system whereas the Obstetrician work in a particular area of gynaecology that focuses on childbirth. They perform c-secs, surgical removal of ovarian tumours etc.
`
  },
  {
    title: `
    Optometrist`,
    desc: `
An Eye Doctor, any defects in the vision or any eye related issues we go see an Optometrist.
`
  },
  {
    title: `
Orthopedic Surgeon 
`,
    desc: `
A Doctor who treats the skeletal system.
`
  },
  {
    title: `
Pediatrician 
`,
    desc: `
The Doctors who work with infants, children and teenagers and treats various health issues.
`
  },
  {
    title: `
Urologist 
`,
    desc: `
The Doctor who specializes in issues related to the urinary system and also treats male reproductive organs.
`
  },
  {
    title: `
Neurologist 
`,
    desc: `
The Doctor who treats the human brain. A Neurosurgeon is the one who operates on the human brain.
`
  }
];
const selectOptions = [
  {
    val: "Step One"
  },
  {
    val: "Step Two",
  },
  {
    val: "Step Three"
  }
];

const StepDoctors = props => (
  <div className="create-ticket__step-two create-ticket__step-doctors">
    <CustomSelect selected="Step Three" options={selectOptions} />
    <div className="create-ticket__cards">
      {createTicketCards.map(item => (
        <CreateTicketCard
          key={item.title}
          title={item.title}
          showSubtitle="show"
          appearance="ticket-card_short"
          link="/create-ticket/ticket"
        />
      ))}
    </div>
    <div />
  </div>
);

export default StepDoctors;
