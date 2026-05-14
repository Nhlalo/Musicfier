export default async function recordFromMic(durationMs = 4000) {
  // Request microphone access
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  const chunks = [];

  // Collect audio data chunks
  mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

  mediaRecorder.start();

  await new Promise((resolve) => setTimeout(resolve, durationMs));

  mediaRecorder.stop();

  const audioBlob = await new Promise((resolve) => {
    mediaRecorder.onstop = () =>
      resolve(new Blob(chunks, { type: "audio/webm" }));
  });

  // Turn off microphone
  stream.getTracks().forEach((track) => track.stop());

  return audioBlob;
}
