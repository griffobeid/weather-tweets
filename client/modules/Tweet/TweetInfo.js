import React, { PureComponent } from 'react';
import styles from './styles/Info.css';

export default class TweetInfo extends PureComponent {
  render() {
    const { info } = this.props;
    const { text, profileImageUrl, createdAt, screenName } = info;

    return (
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.imgContainer}>
            <img src={profileImageUrl} alt="twitter profile" />
          </div>
          <div className={styles.nameContainer}>
            <h3><a href={`https://twitter.com/${screenName}`} target="_blank">@{screenName}</a></h3>
            <p>{createdAt}</p>
          </div>
        </div>
        <div className={styles.row}>
          {text}
        </div>
      </div>
    );
  }
}
