import Classical from "./Classical";
import Disco from "./Disco";
import Folk from "./Folk";
import Jazz from "./Jazz";
import Kpop from "./Kpop";
import Pop from "./Pop";
import Rock from "./Rock";
import Soundtrack from "./Soundtrack";

export default function Page() {
  return (
    <>
      <Pop />
      <Kpop />
      <Rock />
      <Disco />
      <Folk />
      <Jazz />
      <Classical />
      <Soundtrack />
    </>
  );
}
