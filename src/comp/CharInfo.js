import DM from "./DM"

const CharacterInfo = ({ name, race, charClass, hp }) => (<div>
<DM  prompt={"display character info"} title={"Character info"} ></DM>
<a href="/adventure"><button href="/adventure">Start Adventue</button></a>
</div>
  );
  
  export default CharacterInfo;
  