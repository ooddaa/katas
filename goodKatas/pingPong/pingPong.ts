export function pingPong(startNumber: number, endNumber: number): string {
  let holder = [];
  for (let i = startNumber; i <= endNumber; i++) {
    if (i % 15 === 0) {
      holder.push("PingPong");
    } else if (i % 3 === 0) {
      holder.push("Ping");
    } else if (i % 5 === 0) {
      holder.push("Pong");
    } else {
      holder.push(i);
    }
  }
  return holder.join(" ");
}
