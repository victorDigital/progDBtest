<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Accordion from '$lib/components/ui/accordion';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	let selectedUser: { id: number; age: number } | null = $state(null);
	let age = $state('');
	let id = $state('');
	let firstName = $state('');
	let lastName = $state('');

	let { data }: { data: PageData } = $props();

	async function addUser() {
		const formData = new FormData();
		formData.append('age', age);
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);

		await fetch('?/addUser', {
			method: 'POST',
			body: formData
		});

		age = '';
		firstName = '';
		lastName = '';
		invalidateAll();
	}

	async function updateUser() {
		const formData = new FormData();
		formData.append('id', id);
		formData.append('age', age);
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);

		await fetch('?/updateUser', {
			method: 'POST',
			body: formData
		});

		id = '';
		age = '';
		firstName = '';
		lastName = '';
		invalidateAll();
	}

	async function deleteUser() {
		const formData = new FormData();
		formData.append('id', id);

		await fetch('?/deleteUser', {
			method: 'POST',
			body: formData
		});

		id = '';
		invalidateAll();
	}

	async function selectUser() {
		const formData = new FormData();
		formData.append('id', id);

		const response = await fetch('?/selectUser', {
			method: 'POST',
			body: formData
		});

		const data = await response.json();
		selectedUser = data.user;
	}
</script>

<main>
	<h1 class="text-center text-4xl font-bold">User Management</h1>

	<div class="constainer mx-auto max-w-2xl">
		<Accordion.Root type="single">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Add User</Accordion.Trigger>
				<Accordion.Content class="p-3">
					<section>
						<Input class="mb-2" type="number" bind:value={age} placeholder="Age" />
						<Input class="mb-2" type="text" bind:value={firstName} placeholder="First Name" />
						<Input class="mb-2" type="text" bind:value={lastName} placeholder="Last Name" />
						<Button onclick={addUser}>Add User</Button>
					</section>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>Update User</Accordion.Trigger>
				<Accordion.Content class="p-3">
					<section>
						<Input class="mb-2" type="number" bind:value={id} placeholder="ID" />
						<Input class="mb-2" type="number" bind:value={age} placeholder="Age" />
						<Input class="mb-2" type="text" bind:value={firstName} placeholder="First Name" />
						<Input class="mb-2" type="text" bind:value={lastName} placeholder="Last Name" />
						<Button onclick={updateUser}>Update User</Button>
					</section>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>Delete User</Accordion.Trigger>
				<Accordion.Content class="p-3">
					<section>
						<Input class="mb-2" type="number" bind:value={id} placeholder="ID" />
						<Button onclick={deleteUser}>Delete User</Button>
					</section>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-4">
				<Accordion.Trigger>Select User</Accordion.Trigger>
				<Accordion.Content class="p-3">
					<section>
						<Input class="mb-2" type="number" bind:value={id} placeholder="ID" />
						<Button onclick={selectUser}>Select User</Button>
						{#if selectedUser}
							<p>Selected User: {selectedUser.id} - {selectedUser.age}</p>
						{/if}
					</section>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<h2 class="mb-3 mt-6 text-center text-xl font-bold">All Users</h2>
		<section class="flex flex-col items-center">
			<div class="grid w-full grid-cols-1 gap-4 *:w-full">
				{#each data.users as user (user.id)}
					<div animate:flip={{ duration: 300 }} in:fade out:fade>
						<Card.Root>
							<Card.Header>
								<Card.Title>{user.firstName} {user.lastName}</Card.Title>
								<Card.Description>{user.age} years old</Card.Description>
							</Card.Header>
							<Card.Content>
								<p>ID: {user.id}</p>
							</Card.Content>
						</Card.Root>
					</div>
				{/each}
			</div>
		</section>
	</div>
</main>
