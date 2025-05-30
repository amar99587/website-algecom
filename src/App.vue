<template>
  <header class="fixed w-full h-16 flex justify-between items-center bg-white p-6 z-10 duration-300">
    <img src="@/assets/logo.svg" class="w-32" alt="Algecom's logo">
    <a href="https://app.algecom.com" class="font-family-dela text-xs bg-zinc-800 hover:bg-zinc-700 duration-300 text-white text-center py-1 px-6 rounded-md cursor-pointer">
      Go to Console
    </a>
  </header>
  <div class="fixed inset-0 flex justify-center items-center">
    <div class="md:w-6/12 text-center flex flex-col justify-center items-center p-6 rounded-xl">
      <h1 class="font-family-dela text-5xl pb-4 cursor-default">Mr7ba bik M3ana</h1>
      <p class="w-11/12 md:w-8/12 text-sm font-semibold text-zinc-500 text-center mt-24 md:mt-12 cursor-default">
        Algecom isn’t just here to take orders — it chats with your customers,
        answers their questions, and sells like a pro, all in Algerian slang!
        Focus on growing, we’ll handle the hustle.
      </p>
      <div class="space-y-2 mt-16 duration-500" :class="conversation.length ? 'w-10/12 md:w-6/12' : 'w-8/12 md:w-4/12'">
        <h6 class="text-start font-extrabold text-zinc-500 cursor-default">Give it a try</h6>
        <form v-if="!conversation.length" class="relative" @submit.prevent>
          <input v-model="message" maxlength="100" placeholder="Slm wchrak ?" class="w-full bg-neutral-100 border-2 border-neutral-300 hover:border-neutral-400 duration-300 text-sm px-2 py-1.5 rounded-lg placeholder:text-xs placeholder:text-neutral-400 placeholder:pb-0.5">
          <button @click="send(message)" type="submit" title="Send message" class="absolute inset-y-0 right-0 flex items-center px-1 cursor-pointer text-zinc-400 hover:text-zinc-600 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5.133 18.02q-.406.163-.77-.066T4 17.288v-3.942L9.846 12L4 10.654V6.712q0-.438.364-.666t.77-.067l12.512 5.269q.49.225.49.756q0 .53-.49.748z"/>
            </svg>
          </button>
        </form>
        <div v-else class="relative w-full bg-neutral-100 border-2 border-neutral-300 px-2 pt-2 pb-1 rounded-lg">
          <div class="h-48 mb-2">
            <div ref="chatContainer" class="flex flex-col-reverse flex-1 gap-4 overflow-y-auto scroll-smooth duration-300 scrollbar-hide">
              <div v-if="sending" class="w-fit text-xs text-start text-neutral-400">Thinking...</div>
              <div v-for="(message, index) in [ ...conversation ].reverse()" :key="index" class="w-fit max-w-[60%] text-sm text-start" :class="message.type == 'model' ? 'mr-auto text-neutral-700' : 'ml-auto bg-neutral-200 px-3 py-1 rounded-md'">
                {{ message.text }}
              </div>
            </div>
          </div>
          <form class="relative" @submit.prevent>
            <input v-model="message" maxlength="100" placeholder="Your message" class="w-full bg-neutral-100 border-t-2 border-neutral-200 text-sm px-2 pb-1.5 pt-3 placeholder:text-xs placeholder:text-neutral-400 placeholder:pb-0.5">
            <button @click="send(message)" type="submit" title="Send message" class="absolute inset-y-0 right-0 flex items-center px-1 pt-2 cursor-pointer text-zinc-400 hover:text-zinc-600 duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5.133 18.02q-.406.163-.77-.066T4 17.288v-3.942L9.846 12L4 10.654V6.712q0-.438.364-.666t.77-.067l12.512 5.269q.49.225.49.756q0 .53-.49.748z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const id = Date.now();
const message = ref("");
const sending = ref(false);
const conversation = ref([]);
const chatContainer = ref(null);

const send = async msg => {
  if (msg?.trim() === "") return;

  sending.value = true;
  conversation.value.push({ type: "user", text: msg });
  setTimeout(() => chatContainer.value.scrollIntoView(0), 100);
  message.value = "";

  const response = await fetch("https://n8n.algecom.onrender.com/webhook/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, message: msg }),
  });

  if (!response.ok) {
    console.error("Error:", response.statusText);
    return;
  }
  
  sending.value = false;
  const data = await response.json();
  conversation.value.push({ type: "model", text: data.message });
  setTimeout(() => chatContainer.value.scrollIntoView(0), 100);
};
</script>

<style>
.fill-available {
  height: -webkit-fill-available;
  width: -webkit-fill-available;
}
</style>