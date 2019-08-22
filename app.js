import cors from 'cors';
import { app, errorHandler } from 'mu';
import { ok } from 'assert';

const { getAllAgendaItemsFromAgendaWithDocuments } = require('./repository');

app.use(cors());

app.get('/getDocumentsFromAgenda/:agenda_id', async (req, res) => {
  if (!req.params || !req.params.agenda_id) {
    throw new Error(res, 'Agenda_id is missing.');
  }
  const agenda_id = req.params.agenda_id;
  try {
    const allAgendaItemsWithDocuments = await getAllAgendaItemsFromAgendaWithDocuments(agenda_id);
    res.send({
      status: ok,
      data: {
        files: allAgendaItemsWithDocuments.filter((item) => item.download),
      },
    });
  } catch (e) {
    console.log('Something went wrong', e);
    throw new Error('Something went wrong with querying the data from the database.');
  }
});

app.use(errorHandler);