export interface EditorProps {
	value: string;
	modifyText: ModifyText;
}

export type ModifyText = {
	(e: React.ChangeEvent<HTMLTextAreaElement>): void;
};
