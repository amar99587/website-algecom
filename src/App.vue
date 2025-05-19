<template>
  <header class="fixed w-full h-16 flex justify-between items-center bg-white p-6 z-10 duration-300">
    <img src="@/assets/logo.svg" class="w-32" alt="Algecom's logo">
    <template v-if="fbInitzed">
      <div v-if="user.id" class="flex justify-betwee items-center gap-6">
        <a :href="'https://app.algecom.com?token=' + user.access_token" class="hidden md:block font-family-dela text-xs bg-zinc-800 hover:bg-zinc-700 duration-300 text-white text-center py-1 px-6 rounded-md cursor-pointer">
          Go to Console
        </a>
        <img :src="user.avatar" class="w-9 h-9 bg-zinc-200 rounded-full cursor-pointer" :alt="user.name" @click="userCard = true">
      </div>
      <button v-else @click="userCard = true" class="font-family-dela text-xs bg-zinc-800 hover:bg-zinc-700 duration-300 text-white text-center py-1 px-6 rounded-md cursor-pointer">Login</button>
      <div v-if="userCard" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-500">
        <div class="bg-white w-10/12 md:w-3/12 max-w-md pt-4 pb-2 px-5 rounded-xl -translate-y-20">
          <header class="flex justify-between items-center mb-8">
              <h2 class="font-family-dela text-lg font-bold">Account</h2>
              <button v-if="!logging" @click="userCard = false">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1.5em" viewBox="0 0 384 512">
                  <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7L86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256L41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256z"/>
                </svg>
              </button>
          </header>
          <div class="flex flex-col gap-2">
            <template v-if="user.id">
              <img :src="user.avatar" class="w-20 h-20 bg-zinc-200 rounded-full mx-auto mb-4">
              <p class="text-center cursor-default">
                <span class="text-xl text-neutral-800 font-semibold">{{ user.name }}</span> <br>
                <span class="text-[smaller] text-neutral-600 font-medium">{{ user.email }}</span>
              </p>
              <button @click="loginWithGoogle" class="font-family-dela text-xs bg-red-800 hover:bg-red-700 duration-300 text-white text-center py-1.5 px-6 mx-auto mt-10 mb-2 rounded-md w-fit tracking-wider cursor-pointer">Google</button>
              <a :href="'https://app.algecom.com?token=' + user.access_token" class="font-family-dela text-xs bg-zinc-800 hover:bg-zinc-700 duration-300 text-white text-center py-1.5 px-6 mx-auto rounded-md w-fit tracking-wider cursor-pointer">Go to Console</a>
              <p class="grid gap-1  text-center mt-2 cursor-default">
                <span @click="logout" class="text-xs font-semibold text-neutral-500 hover:text-red-600 duration-300 cursor-pointer">Logout</span>
                <span class="text-[xx-small] text-neutral-400 font-medium">
                  <a href="" targer="_blank" class="hover:text-neutral-600 duration-300 cursor-pointer">Terms</a> and <a href="" targer="_blank" class="hover:text-neutral-600 duration-300 cursor-pointer">Privacy Policy</a>.
                </span>
              </p>
            </template>
            <template v-else>
              <img src="@/assets/avatar.png" class="w-20 h-20 bg-zinc-400 rounded-full mx-auto mb-4">
              <p class="text-[smaller] text-neutral-800 font-medium text-center cursor-default">
                Create or Login to your account <br>
                using your Facebook account
              </p>
              <button v-if="logging" class="font-family-dela text-xs bg-zinc-300 text-zinc-500 duration-300 text-center py-1.5 px-6 mx-auto mt-10 rounded-md w-fit tracking-wider cursor-wait">Logging...</button>
              <button v-else @click="login" class="font-family-dela text-xs bg-[#007AFF] hover:bg-[#0060C8] duration-300 text-white text-center py-1.5 px-6 mx-auto mt-10 rounded-md w-fit tracking-wider  cursor-pointer">Facebook</button>
              <p class="text-[xx-small] text-neutral-400 font-medium text-center mt-2 cursor-default">
                By continuing, you agree to our <br>
                <a href="" targer="_blank" class="hover:text-neutral-600 duration-300">Terms</a> and <a href="" targer="_blank" class="hover:text-neutral-600 duration-300">Privacy Policy</a>.
              </p>
            </template>
          </div>
        </div>
      </div>
    </template>
    <img v-else title="Facebook SDK is not initialized yet" src="@/assets/avatar.png" class="w-9 h-9 bg-zinc-200 rounded-full cursor-wait">
  </header>
  <div class="text-center mt-44">
    <h1 class="font-family-dela text-5xl pb-4 cursor-default">Mr7ba bik m3ana 🔥</h1>
    <p class="w-11/12 text-sm font-semibold text-zinc-500 text-center mt-24 md:mt-12 mx-auto cursor-default">
      Algecom isn’t just here to take orders — it chats with your customers, <br class="hidden md:block">
      answers their questions, and sells like a pro, all in Algerian slang! <br class="hidden md:block">
      Focus on growing, we’ll handle the hustle.
    </p>
    <div class="space-y-2 mt-16 mx-auto duration-500" :class="conversation.length ? 'w-10/12 md:w-4/12' : 'w-6/12 md:w-2/12'">
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
    <div class="w-10/12 flex justify-between items-start gap-8 my-24 md:my-48 mx-auto">
      <div class="md:w-6/12 text-start space-y-4">
        <h1 class="font-family-dela text-2xl">With us... Sell like PRO</h1>
        <ul class="text-sm text-neutral-500 space-y-2">
          <li>🕒 24/7 operation – always available</li>
          <li>💸 Lower cost – compare to humans</li>
          <li>⚡ Faster response – instant replies</li>
          <li>📈 Scalable – handles 1000s of users at once</li>
          <li>🍃 Consistent service – no bad days</li>
          <li>🛒 Smarter upselling – based on real-time data</li>
          <li>❌ Fewer errors – no typos or wrong info</li>
          <li>🌍 Multilingual – speaks any language</li>
          <!-- <li>📊 Better analytics – tracks everything</li> -->
          <li>🔌 Easy to integrate – works with your tools</li>
          <li class="pt-4">💞 All with Algerien slang</li>
        </ul>
      </div>
      <div class="hidden md:block w-6/12 h-80 bg-gray-200 bg-[url(https://www.gstatic.com/bricks/image/0a44696f-75ce-4949-9529-af21543c8f82.jpg)] bg-cover bg-center bg-no-repeat rounded-xl mx-auto"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { loadGapiInsideDOM } from 'gapi-script';

const CLIENT_ID = '520593359020-rqg64cfm6n4f4fvkchv4f5st45rhq3pr.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.metadata.readonly';

const initClient = () => {
  gapi.client.init({
    clientId: CLIENT_ID,
    scope: SCOPES,
  });
};

const id = Date.now();
const message = ref("");
const logging = ref(false);
const sending = ref(false);
const fbInitzed = ref(false);
const userCard = ref(false);
const conversation = ref([]);
const chatContainer = ref(null);

const user = ref({
  id: "",
  email: "",
  name: "",
  avatar: "",
  picture: "",
  access_token: ""
});

const clearUser = () => {
  user.value = {
    id: "",
    email: "",
    name: "",
    avatar: "",
    picture: "",
    access_token: ""
  };
};

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

const logout = () => {
  window.FB.logout();
  clearUser();
};

const getUser = access_token => {
  const facebookGraph = "https://graph.facebook.com/v19.0/me/picture?height=300&width=300&access_token=";
  if (access_token) {
    window.FB.api('/me', { fields: 'name,email,picture', access_token }, (data) => {
      if (data?.error) {
        console.error("Error fetching user data:", data.error);
        fbInitzed.value = true;
        return;
      }
      user.value = { ...data, access_token, avatar: facebookGraph + access_token };
      fbInitzed.value = true;
      logging.value = false;
    });
  }
  else logout();
};

const login = () => {
  logging.value = true;
  window.FB.login(({ status, authResponse }) => {
    if (status == "connected") {
      const token = authResponse.accessToken;
      FB.api('/me/permissions', ({ data }) => !data.every(e => e.status == "granted") && alert("Please allow all permissions"));
      FB.api('/me/accounts', ({ data }) => !data.length && alert("Please add a page to your account"));
      getUser(token);
    }
    else {
      console.log('User cancelled login or did not fully authorize.');
      logging.value = false;
    }
  }, {
    scope: 'email,pages_show_list,pages_manage_metadata,pages_messaging,pages_read_engagement',
    login_config_id: '3970975716449824',
    auth_type: 'rerequest'
  });
};

const checkLoginState = () => {
  window.FB.getLoginStatus(({ status, authResponse }) => {    
    if (status == "connected") {
      const token = authResponse.accessToken;
      getUser(token);
    }
    else {
      fbInitzed.value = true;
      clearUser();
    };
  });
};

const initFacebookSDK = () => {
  window.FB.init({
    appId: '1684228275531632', // Replace with your app ID
    version: 'v17.0', // Replace with desired version
    cookie: true,
    xfbml: true,
  });

  window.FB.AppEvents.logPageView();
  checkLoginState();
};

const google = {};

const loginWithGoogle = async () => {
  const auth = gapi.auth2.getAuthInstance();

  try {
    const user = await auth.signIn();
    const token = user.getAuthResponse().access_token;
    console.log('Access token:', token);
    
    // Optional: Store user or token
    const profile = user.getBasicProfile();
    console.log('User:', {
      profile,
      name: profile.getName(),
      email: profile.getEmail(),
    });

    // Use token with Google Sheets API or pass to backend
  } catch (err) {
    console.error('Login failed:', err);
  }
};

onMounted(async () => {
  // Load the Google SDK asynchronously
  await loadGapiInsideDOM();
  gapi.load('client:auth2', initClient);

  initFacebookSDK();
  setTimeout(() => {
    if(!fbInitzed.value) {
      const interval = setInterval(() => {
        if (fbInitzed.value) {
          clearInterval(interval);
          checkLoginState();
        }
        else initFacebookSDK();
      }, 5000);
    }
  }, 5000);
});
</script>