/**
 * @description
 * This script scans all Spotify podcast list items on the current page,
 * extracts the channel name, episode title, and link, and then formats
 * them into a Markdown link list.
 */
function generatePodcastMarkdownList() {
  // --- Configuration ---
  // 1. Set the base URL for the share links as you specified.
  const baseUrl = 'https://open.spotify.com';

  // --- Core Logic ---
  // 2. Select all container elements for each episode row on the page.
  // Using `data-encore-id="listRow"` is more stable than auto-generated class names.
  const episodeRows = document.querySelectorAll(
    'div[data-encore-id="listRow"]'
  );

  if (episodeRows.length === 0) {
    const message =
      'No podcast episodes found. Please ensure the page is loaded and the selector is correct.';
    console.log(message);
    return message;
  }

  const markdownResults = [];

  // 3. Iterate over each episode row element found.
  episodeRows.forEach((row, index) => {
    // 4. Extract the episode title and its link path (href).
    // The selector directly targets the <a> tag containing the title and link.
    const titleAnchor = row.querySelector(
      'h3[data-encore-id="listRowTitle"] a'
    );
    const episodeTitle = titleAnchor ? titleAnchor.innerText.trim() : null;
    const episodePath = titleAnchor ? titleAnchor.getAttribute('href') : null;

    console.log(episodeTitle, episodePath);

    // 5. Extract the channel name.
    // The selector targets the <span> containing the channel name.
    const channelSpan = row.querySelector(
      'p[data-encore-id="listRowSubtitle"] a span'
    );
    const channelName = channelSpan ? channelSpan.innerText.trim() : null;

    // 6. Ensure all necessary data has been successfully extracted.
    if (channelName && episodeTitle && episodePath) {
      // 7. Construct the final share link.
      const shareLink = baseUrl + episodePath;

      console.log('baseUrl', baseUrl);
      console.log('episodePath', episodePath);
      console.log('shareLink', shareLink);

      // 8. Format the data into a Markdown string as per your requirement.
      const markdownLine = `[${channelName}｜${episodeTitle}](${shareLink})`;
      markdownResults.push(markdownLine);
    } else {
      // If an item is missing data, log a warning to the console for debugging.
      console.warn(`Skipping item ${index + 1} due to missing data.`, {
        channelName,
        episodeTitle,
        episodePath,
      });
    }
  });

  // 9. Join all the results into a single string, separated by newlines.
  const finalOutput = markdownResults.join('\n');

  // 10. Print the final output to the console.
  console.log('--- Copy the content below ---');
  console.log(finalOutput);
  console.log('--- End of content ---');

  // Also, return the result for potential advanced use.
  return finalOutput;
}

// Execute the function immediately.
generatePodcastMarkdownList();
