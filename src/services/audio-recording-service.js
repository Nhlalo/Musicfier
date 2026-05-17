export default async function recordFromMic(durationMs = 7000, signal) {
  if (typeof durationMs !== "number" || durationMs <= 0) {
    throw new Error("Duration must be a positive number");
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error("Browser does not support getUserMedia");
  }

  if (signal?.aborted) {
    throw new Error("Recording aborted before start");
  }

  let stream = null;
  let mediaRecorder = null;
  const chunks = [];

  const stopTracks = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
    }
  };

  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Try different MIME types
    let mimeType = "";
    if (MediaRecorder.isTypeSupported("audio/webm")) {
      mimeType = "audio/webm";
    } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
      mimeType = "audio/mp4";
    } else if (MediaRecorder.isTypeSupported("audio/ogg")) {
      mimeType = "audio/ogg";
    }

    const options = mimeType ? { mimeType } : {};
    mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorder.start(1000); // Collect data every second

    // Wait for recording to complete or be aborted
    await new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        resolve();
      }, durationMs);

      if (signal) {
        const abortListener = () => {
          clearTimeout(timeoutId);
          if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
          }
          stopTracks();
          reject(new Error("Recording aborted"));
        };
        signal.addEventListener("abort", abortListener, { once: true });
      }
    });

    // Stop the recorder
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }

    // Wait for onstop to fire and create the blob
    const audioBlob = await new Promise((resolve) => {
      mediaRecorder.onstop = () => {
        if (chunks.length === 0) {
          resolve(null);
          return;
        }
        const blob = new Blob(chunks, { type: mimeType || "audio/webm" });
        resolve(blob);
      };
    });

    stopTracks();

    if (!audioBlob || audioBlob.size === 0) {
      throw new Error(
        "No audio data captured - check microphone or increase duration",
      );
    }

    return audioBlob;
  } catch (error) {
    stopTracks();
    if (error.name === "NotAllowedError") {
      throw new Error("Microphone permission denied");
    }
    if (error.name === "NotFoundError") {
      throw new Error("No microphone found");
    }
    throw error;
  }
}
