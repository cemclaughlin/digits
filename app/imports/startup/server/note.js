import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Note } from '../../api/note/note.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Note.insert(data);
}

/** Initialize the collection if empty. */
if (Note.find().count() === 0) {
  if (Meteor.settings.defaultNote) {
    console.log('Creating default data.');
    Meteor.settings.defaultNote.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Note', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Note.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('NoteAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Note.find();
  }
  return this.ready();
});
