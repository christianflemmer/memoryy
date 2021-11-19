export interface ICard {
	readonly id: number;
	readonly name: string;
	readonly src: string;

	matched: boolean;
}

const CARDS: ReadonlyArray<ICard> = [
	{ id: null, src: 'assets/avenged-sevenfold.jpg', name: 'avenged-sevenfold', matched: false },
	{ id: null, src: 'assets/blink-182.jpg', name: 'blink-182', matched: false },
	{ id: null, src: 'assets/caskets.jpg', name: 'caskets', matched: false },
	{ id: null, src: 'assets/metallica.jpg', name: 'metallica', matched: false },
	{ id: null, src: 'assets/nirvana.jpg', name: 'nirvana', matched: false },
	{ id: null, src: 'assets/oceans-ate-alaska.jpg', name: 'oceans-ate-alaska', matched: false },
	{ id: null, src: 'assets/system-of-a-down.jpg', name: 'system-of-a-down', matched: false },
	{ id: null, src: 'assets/time-the-valuator.jpg', name: 'time-the-valuator', matched: false },
];

const DUPLICATED_CARDS = (): ICard[] => [
	...CARDS.map((card: ICard): ICard => {
		return {
			...card,
			id: Math.random(),
		};
	}),
	...CARDS.map((card: ICard): ICard => {
		return {
			...card,
			id: Math.random(),
		};
	}),
];

export const RANDOMIZED_CARDS = (): ICard[] => DUPLICATED_CARDS().sort(() => Math.random() - 0.5);
