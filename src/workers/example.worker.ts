const ctx: Worker = self as any

ctx.onmessage = (event: any) => {
  console.log(event.data)
}

ctx.postMessage({ result: 'cool' })
