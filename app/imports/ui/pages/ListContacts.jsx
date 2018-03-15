import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Contact from '/imports/ui/components/Contact';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListContacts extends React.Component {
  contacts = [{
    firstName: 'Philip', lastName: 'Johnson', address: 'POST 307, University of Hawaii',
    image: 'https://philipmjohnson.github.io/images/philip2.jpeg',
    description: 'I am a Professor of Information and Computer Sciences at the University of Hawaii, Director ' +
    'of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com.',
  },
    {
      firstName: 'Henri', lastName: 'Casanova', address: 'POST 307, University of Hawaii',
      image: 'https://avatars0.githubusercontent.com/u/7494478?s=460&v=4',
      description: 'I am originally from France. I maintain a list of reports from my surf sessions. I have proof ' +
      'that I ran the Hana relay with an actual Team.',
    },
    {
      firstName: 'Kim', lastName: 'Binsted', address: 'POST 307, University of Hawaii',
      image: 'https://pbs.twimg.com/profile_images/798636728852434944/Y2EMD2i5_400x400.jpg',
      description: 'Kim Binsted received her BSc in Physics at McGill (1991), and her PhD in Artificial Intelligence' +
      'from the University of Edinburgh (1996). Her thesis topic was the computational modeling and generation of ' +
      'punning riddles, and her program, JAPE (Joke Analysis and Production Engine), generated puns such as ' +
      '"What do you call a Martian who drinks beer? An ale-ien!".',
    },
  ];

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>List Contacts</Header>
          <Card.Group>
            {this.contacts.map((contact, index) => <Contact key = {index} contact = {contact} />)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListContacts.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListContacts);
