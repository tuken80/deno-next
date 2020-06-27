import { Next, Browser } from "../mod.ts";

const Page = () => <div>Hellow</div>;
const View = () => <Page />;

new Browser(<View />);
