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
            <h2><a href={`https://twitter.com/${screenName}`} target="_blank">@{screenName}</a></h2>
            <h5>{createdAt}</h5>
          </div>
        </div>
        <div className={styles.row}>
          {text}
        </div>
      </div>
    );
  }
}
