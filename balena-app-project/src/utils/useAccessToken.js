const api_app = import.meta.env.VITE_API_APP;

export default async function useAccessToken() {
  try {
    const response = await fetch(api_app,{
      method:'POST',
      headers:{"Content-Type" : "application/json"},
      body: JSON.stringify({roomName:"balena-ai",participantName:"participant1"})
    })
    if (!response.ok) {
      throw new Error('can\'t get the access tocken');
      return null;
    };
    return response.json().then((r) => console.log(r.access_token));
  } catch (e) {
    console.log('can\'t get the access tocken',e.message);
  }
}
