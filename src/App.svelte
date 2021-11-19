<script lang="ts">
	import { onMount } from "svelte";
	import Card from "./lib/Card.svelte";
	import { ICard, RANDOMIZED_CARDS } from "./utils/card.model";

	onMount((): void => startNewGame());

	let randomizedCards: ICard[] = [];

	let numberOfTurns: number = 0;
	let choiceOne: ICard = null;
	let choiceTwo: ICard = null;
	let disabled: boolean = false;

	// let svelte know these value changes, and run the desired function on changes
	$: choiceOne && compareCards();
	$: choiceTwo && compareCards();

	/**
	 * Start new game.
	 */
	const startNewGame = (): void => {
		randomizedCards.forEach(
			(card: ICard): boolean => (card.matched = false)
		);
		choiceOne = null;
		choiceTwo = null;
		numberOfTurns = 0;
		setTimeout(
			(): ICard[] => (randomizedCards = RANDOMIZED_CARDS()),
			randomizedCards.length === 0 ? 0 : 500
		);
	};

	/**
	 * Compare cards.
	 */
	const compareCards = (): void => {
		if (choiceOne && choiceTwo) {
			disabled = true;
			if (choiceOne.src === choiceTwo.src) {
				randomizedCards.forEach((card: ICard): void => {
					if (card.src === choiceOne.src) {
						card.matched = true;
					}
				});
			}
			setTimeout(() => resetTurn(), 1000);
		}
	};

	/**
	 * Handle individual choice
	 *
	 * @param customEvent
	 */
	const handleChoice = (customEvent: CustomEvent<ICard>): void => {
		if (choiceOne && choiceOne.id === customEvent.detail.id) {
			return;
		}
		choiceOne
			? (choiceTwo = customEvent.detail)
			: (choiceOne = customEvent.detail);
	};

	/**
	 * Reset turn.
	 */
	const resetTurn = (): void => {
		choiceOne = null;
		choiceTwo = null;
		disabled = false;
		numberOfTurns++;
	};
</script>

<main>
	<h1>memoryy</h1>
	<small>Website tailored with 💜 by Christian Flemmer</small>
	<small>Powered by Svelte</small>
	<section>
		<button on:click={() => startNewGame()}>New game</button>
		<div>
			{#each randomizedCards as card}
				<Card
					{card}
					{disabled}
					flipped={card.matched ||
						card === choiceOne ||
						card === choiceTwo}
					on:clicked={(customEvent) => handleChoice(customEvent)}
				/>
			{/each}
		</div>
		<p>Turns: {numberOfTurns}</p>
	</section>
</main>

<style>
	main {
		height: 100%;
		overflow-y: auto;
	}

	section {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	h1 {
		font-size: 3rem;
		font-weight: 800;
		letter-spacing: -0.2rem;
	}

	h1,
	small {
		display: block;
		padding-left: 50px;
		margin-bottom: 10px;
	}

	div {
		display: grid;
		grid-template-columns: repeat(4, 8rem);
		grid-template-rows: repeat(4, 8rem);
		gap: 2rem;
		perspective: 800px;
	}
</style>
