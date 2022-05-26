import { html } from 'lit';
import '../src/lit-app.js';

export default {
  title: 'LitApp',
  component: 'lit-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <lit-app
      style="--lit-app-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </lit-app>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
