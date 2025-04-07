export const loader = async () => {
  const isHealthy = true; // Replace with actual health check logic

  if (!isHealthy) {
    return new Response('Server is unhealthy', { status: 500 });
  }

  return new Response('Server is healthy');
};
