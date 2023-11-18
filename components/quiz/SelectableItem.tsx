function SelectedIcon({text} : {text: string} ) {
  return (
		
    <div className="p-6 flex items-center gap-2 border border-solid border-ddBlue rounded-md cursor-pointer">
      <div className="h-2 w-2 p-1 border-2 border-solid border-ddBlue rounded-full">
        <div className="w-full h-full bg-ddBlue rounded-full"></div>
      </div>
			{text}
    </div>
		
		
  );
}

function UnSelectedIcon({text} : {text: string}) {
  return (
    <div className="p-6 flex items-center gap-2 border border-solid border-ddDarkGrey rounded-md cursor-pointer">
      <div className="h-2 w-2 p-1 border-2 border-solid border-ddDarkGrey rounded-full">        
      </div>
			{text}
    </div>
  );
}


export default function SelectableItem({
  text,
  selected,
}: {
  text: string;
  selected: boolean;
}) {
if(selected){
	return <SelectedIcon text={text} />
}

return <UnSelectedIcon text={text} />
}
