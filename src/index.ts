import { serve }              from '@hono/node-server'
import { Hono }               from 'hono'
import { eventsRoute }        from './modules/events/routes';
import { participantsRoute }  from './modules/participants/routes';

const app = new Hono()

app.route("/events", eventsRoute);
app.route("/participants", participantsRoute);

serve({
  fetch: app.fetch,
  port: 8080,
  hostname: '127.0.0.1',
}, (info) => {
  console.log(`Server is running on http://127.0.0.1:${info.port}`)
})
