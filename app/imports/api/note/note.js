import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Note = new Mongo.Collection('Note');

/** Create a schema to constrain the structure of documents associated with this collection. */
const NoteSchema = new SimpleSchema({
  note: String,
  contactId: String,
  owner: String,
  createdAt: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Note.attachSchema(NoteSchema);

/** Make the collection and schema available to other code. */
export { Note, NoteSchema };
